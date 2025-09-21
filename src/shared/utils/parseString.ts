interface Page {
     page: number;
     content: string;
}

interface Documento {
     title: string;
     text: Page[];
}


export function parseStringFinal(documento: Documento): string {
     let resultado = `Título: ${documento.title}\n\n`;

     documento.text.forEach(pagina => {
          resultado += `--- Página ${pagina.page} ---\n`;
          resultado += pagina.content.replace(/\s+/g, ' ').trim();
          resultado += "\n\n"; // Agrega una línea extra para separar las páginas
     });

     return resultado;
}