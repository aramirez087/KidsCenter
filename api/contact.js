module.exports = async function handler(request, response) {
    // Only allow POST requests
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const data = request.body || {};
        
        // Destructure form fields with fallbacks
        const name = data.name || data.nombre || 'Usuario';
        const email = data.email || data.correo || 'No provisto';
        const phone = data.phone || data.telefono || 'No provisto';
        const modal = data.modalidad || data.modal || 'No provista';
        const message = data.message || data.mensaje || 'Sin mensaje adicional';
        
        const htmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <h2 style="color: #4AA858; border-bottom: 2px solid #4AA858; padding-bottom: 10px;">Nuevo contacto desde el sitio web</h2>
                <p>Has recibido un nuevo mensaje a través del formulario de contacto de Kids Center.</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Nombre:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">
                            <a href="mailto:${email}" style="color: #4AA858;">${email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Teléfono:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Modalidad:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${modal}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Mensaje:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">${message.replace(/\n/g, '<br/>')}</td>
                    </tr>
                </table>
                <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
                    Enviado el: ${data.timestamp ? new Date(data.timestamp).toLocaleString('es-CR') : new Date().toLocaleString('es-CR')}
                </p>
            </div>
        `;

        // We use the global fetch API (available in Node.js 18+) to call Resend
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Kids Center Website <contacto@kidsscenter.com>',
                to: process.env.CONTACT_EMAIL || 'kidscentercr@gmail.com',
                subject: `Nuevo contacto web - ${name} - Kids Center`,
                html: htmlContent,
                reply_to: email !== 'No provisto' ? email : undefined
            })
        });

        if (res.ok) {
            const json = await res.json();
            return response.status(200).json({ success: true, id: json.id });
        } else {
            const error = await res.json();
            console.error('Resend API Error:', error);
            return response.status(res.status).json({ error: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Server Error:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};
