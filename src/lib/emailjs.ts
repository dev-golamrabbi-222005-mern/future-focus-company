import emailjs from '@emailjs/browser';

/**
 * Configuration for EmailJS service & templates
 */
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateContactId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  templateCvId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CV || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

/**
 * Converts a File object to Base64 string for file attachments
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Sends contact or get-in-touch inquiry via EmailJS
 */
export async function sendContactEmail(params: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  try {
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.publicKey) {
      console.warn('EmailJS environment variables missing. Operating in fallback simulation mode.');
      // Simulate delay for graceful UI behavior if keys not yet added
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    }

    const templateId = EMAILJS_CONFIG.templateContactId;
    if (!templateId) {
      throw new Error('EmailJS Contact Template ID missing');
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      templateId,
      params,
      EMAILJS_CONFIG.publicKey
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: response.text || 'Failed to send email' };
    }
  } catch (err: any) {
    console.error('EmailJS send error:', err);
    return { success: false, error: err?.message || 'Error connecting to email service' };
  }
}

/**
 * Sends candidate CV application via EmailJS
 */
export async function sendCvEmail(params: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  try {
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.publicKey) {
      console.warn('EmailJS environment variables missing. Operating in fallback simulation mode.');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    }

    const templateId = EMAILJS_CONFIG.templateCvId || EMAILJS_CONFIG.templateContactId;
    if (!templateId) {
      throw new Error('EmailJS CV Template ID missing');
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      templateId,
      params,
      EMAILJS_CONFIG.publicKey
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: response.text || 'Failed to send application email' };
    }
  } catch (err: any) {
    console.error('EmailJS CV send error:', err);
    return { success: false, error: err?.message || 'Error connecting to email service' };
  }
}
