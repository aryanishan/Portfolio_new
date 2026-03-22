import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const frontendUrls = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(url => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || frontendUrls.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function validateContactPayload(body) {
  const errors = {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name) errors.name = 'Name is required';
  if (!emailRegex.test(email)) errors.email = 'A valid email is required';
  if (message.length < 10) errors.message = 'Message must be at least 10 characters';

  return { errors, name, email, message };
}

function createResendClient() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error('RESEND_CONFIG_MISSING');
  }

  return new Resend(resendApiKey);
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const { errors, name, email, message } = validateContactPayload(req.body ?? {});

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      ok: false,
      message: 'Please fix the form errors and try again.',
      errors,
    });
  }

  try {
    const resend = createResendClient();
    const recipient = process.env.MAIL_TO;
    const sender = process.env.MAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>';
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    if (!recipient) {
      throw new Error('MAIL_TO_MISSING');
    }

    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
          <h2 style="margin-bottom: 16px;">New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; padding: 12px; background: #f3f4f6; border-radius: 8px;">${safeMessage}</div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend email failed:', error);
      return res.status(500).json({
        ok: false,
        message: error.message || 'Resend could not send the email. Check your API key and sender address.',
      });
    }

    return res.json({
      ok: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact form email failed:', error);

    if (error.message === 'RESEND_CONFIG_MISSING') {
      return res.status(500).json({
        ok: false,
        message: 'Email service is not configured yet. Add RESEND_API_KEY in backend/.env.',
      });
    }

    if (error.message === 'MAIL_TO_MISSING') {
      return res.status(500).json({
        ok: false,
        message: 'Recipient email is not configured yet. Add MAIL_TO in backend/.env.',
      });
    }

    return res.status(500).json({
      ok: false,
      message: 'Unable to send message right now. Please try again later.',
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
