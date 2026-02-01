"use server";

import nodemailer from "nodemailer";

export async function sendSupportEmail(email: string, message: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            secure: true, // Hostinger usually uses port 465 with secure: true
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self (admin)
            replyTo: email, // Reply to the user
            subject: `[Soporte PlacaCheck] Nuevo mensaje de ${email}`,
            text: `
Has recibido un nuevo mensaje de soporte/sugerencia:

De: ${email}

Mensaje:
${message}

--------------------------------------------------
Este correo fue enviado desde la app PlacaCheck.
      `,
            html: `
        <h2>Nuevo Mensaje de Soporte</h2>
        <p><strong>De:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <blockquote style="background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;">
          ${message.replace(/\n/g, "<br>")}
        </blockquote>
      `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Error sending support email:", error);
        return { success: false, error: "Error sending email" };
    }
}
