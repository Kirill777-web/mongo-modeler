import ReactDOMServer from 'react-dom/server';
import { Size } from '@/core/model';

const initiateDownload = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadFile = (
  filename: string,
  content: string,
  contentType: string
) => {
  const blob = new Blob([content], { type: contentType });
  const svgUrl = URL.createObjectURL(blob);

  initiateDownload(svgUrl, filename);
};

export const downloadSvg = (svg: JSX.Element) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svg);
  downloadFile('diagram.svg', svgString, 'image/svg+xml');
};

export const downloadImage = (svg: JSX.Element, viewBoxSize: Size) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svg);

  const image = new Image();
  image.src = 'data:image/svg+xml,' + encodeURIComponent(svgString);
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = viewBoxSize.width;
    canvas.height = viewBoxSize.height;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      // TODO: export scaleFactor as a constant
      // add scale factor to see the image clearly
      // Revisit this check #124
      // https://github.com/Lemoncode/mongo-modeler/issues/124
      const scaleFactor = 2;
      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(image, 0, 0);
      const imageUrl = canvas.toDataURL('image/png');

      initiateDownload(imageUrl, 'my-image.png');
    }
  };
};
