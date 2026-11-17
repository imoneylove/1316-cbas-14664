import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { fitImageToPage } from './pdfLayout';

export interface PdfExportProgress {
  current: number;
  total: number;
}

export async function exportSlidesToPdf(
  containerEl: HTMLElement,
  fileName: string,
  onProgress?: (progress: PdfExportProgress) => void
): Promise<void> {
  const slideNodes = Array.from(
    containerEl.querySelectorAll<HTMLElement>('[data-export-slide]')
  );

  if (slideNodes.length === 0) {
    throw new Error('找不到可匯出的圖卡節點');
  }

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  for (let i = 0; i < slideNodes.length; i += 1) {
    const node = slideNodes[i];
    onProgress?.({ current: i + 1, total: slideNodes.length });

    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      backgroundColor: '#F8FAFC',
      skipFonts: true,
    });

    const rect = node.getBoundingClientRect();
    const fit = fitImageToPage(rect.width || 1200, rect.height || 720, 297, 210, 10);

    if (i > 0) {
      pdf.addPage('a4', 'landscape');
    }

    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, 0, 297, 210, 'F');
    pdf.addImage(dataUrl, 'PNG', fit.x, fit.y, fit.width, fit.height, undefined, 'FAST');
  }

  pdf.save(fileName);
}
