export const footerStyles = `
    .footer {
        width: 100%;
        border-top: 1px solid #1A85C7;
        display: flex;
        flex-direction: column;
        padding-top: 16px;
        margin: 0 40px;
        font-optical-sizing: auto;
        font-family: 'Outfit', sans-serif;
        font-weight: 400;
        -webkit-print-color-adjust: exact;
    }

     .blue-footer-bar {
        background-color: rgba(34, 131, 212, 0.1);
        padding: 4px 8px;
        width: 100%;
        border-radius: 4px;
        font-size: 12px;
    }

    .footer-content {
    display: flex;
    padding: 8px 0 16px;
    font-size: 14px;
    display: flex;
    justify-content: space-between
    }

    .footer-content-item {
    display: flex;
    flex-direction: column;
    gap: 4px
    }

    .footer-content-title {
    font-weight: bold;
    }
`

export const footerStylesTag = `
    <style>
        ${footerStyles}
    </style>`

export const pdfFooter = () => `
    ${footerStylesTag}
    <div style="font-family: 'Outfit', sans-serif; font-size: 30px; width: 100%; text-align: center;">
        Hello world
    </div>
`

export const pdfFooters = () => `
        ${footerStylesTag}
        <body>
          <div class="footer">
            <div class="footer-content">
              <div class="footer-content-item">
                <div class="footer-content-title">Dr. Max Mustermann</div>
                <div>Dr. Max Mustermann</div>
              </div>
              <div class="footer-content-item">
                <div class="footer-content-title">Dr. Max Mustermann</div>
                <div>Dr. Max Mustermann</div>
              </div>
              <div class="footer-content-item">
                <div class="footer-content-title">Dr. Max Mustermann</div>
                <div>Dr. Max Mustermann</div>
              </div>
            </div>
            <div class="blue-footer-bar">
              Dieses medizinische Dokument wurde auf der Grundlage von KI unter
              Einhaltung der HIPAA-, DSGVO-, HL7-Standards sowie der relevanten ISO-
              und FDA-Richtlinien erstellt.
            </div>
          </div>
        </body>`
