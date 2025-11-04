const PdfViwer = ({ pdfValue }: { pdfValue: string }) => {
  const isBase64 = !pdfValue.startsWith('http') && !pdfValue.startsWith('file://');

  let pdfSource = pdfValue;
  if (isBase64) {
    // Clean base64 string
    pdfSource = pdfValue.trim().replace(/\s/g, '');
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #525252;
          }
          .container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
          .error {
            color: white;
            text-align: center;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${isBase64
      ? `<iframe src="data:application/pdf;base64,${pdfSource}#toolbar=0&view=FitH" type="application/pdf" style="width:100%;height:100%;border:none;"></iframe>`
      : `<iframe src="${pdfSource}#toolbar=0&view=FitH" type="application/pdf" style="width:100%;height:100%;border:none;"></iframe>`
    }
        </div>
      </body>
    </html>`;
};

export default PdfViwer;