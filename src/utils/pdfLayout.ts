export interface PageFitRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Compute centered fit dimensions inside an A4 landscape page (297 x 210 mm)
 * with uniform outer margin, preserving original card aspect ratio.
 */
export function fitImageToPage(
  imgWidthPx: number,
  imgHeightPx: number,
  pageWidthMm = 297,
  pageHeightMm = 210,
  marginMm = 10
): PageFitRect {
  if (imgWidthPx <= 0 || imgHeightPx <= 0) {
    return { x: marginMm, y: marginMm, width: pageWidthMm - marginMm * 2, height: pageHeightMm - marginMm * 2 };
  }

  const availW = pageWidthMm - marginMm * 2;
  const availH = pageHeightMm - marginMm * 2;
  const imgRatio = imgWidthPx / imgHeightPx;
  const boxRatio = availW / availH;

  let drawW: number;
  let drawH: number;

  if (imgRatio >= boxRatio) {
    drawW = availW;
    drawH = availW / imgRatio;
  } else {
    drawH = availH;
    drawW = availH * imgRatio;
  }

  const x = (pageWidthMm - drawW) / 2;
  const y = (pageHeightMm - drawH) / 2;

  return {
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
    width: Number(drawW.toFixed(2)),
    height: Number(drawH.toFixed(2)),
  };
}
