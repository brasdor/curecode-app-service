import { PatientEntity } from "../../patients/entities/patient.entity"
import { bodyStylesTag } from "../customStyles"
import { format } from "date-fns"

type PdfBodyTemplateParams = {
  title: string
  patient: PatientEntity
  htmlContent: string
}

export const pdfBodyTemplate = ({
  title,
  patient,
  htmlContent,
}: PdfBodyTemplateParams) => `
        <html> 
            <head>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
            ${bodyStylesTag}
            </head>
            <body>
                <h1>${title}</h1>

                <div class="blue-header-bar">
                    <div style="font-weight: bold;">Max Muster</div>
                    <div style="display:flex; gap:8px">
                        <div style="color: #61696E;">AHV Nummer:</div>
                        <div>${patient.ahvNumber}</div>
                    </div>
                </div>
                <h1>Patienteninformationen</h1>
                <div>
                    <div>Name: ${`${patient.firstName} ${patient.lastName}`}</div>
                    <div>Geburtsdatum: ${format(new Date(patient.birthDate), "dd.MM.yyyy")}</div>
                    <div>Addresse: Nicht verfügbar</div>
                    <div>Tel. Nr.: Nicht verfügbar</div>
                    <div>Email: Nicht verfügbar</div>
                    <div>Versicherungsinformationen: Nicht verfügbar</div>
                </div>

                ${htmlContent}
            </body>
        </html>
    `
