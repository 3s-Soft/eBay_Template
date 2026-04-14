import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

export function compileTemplate(templateName: string, data: any) {
  try {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const template = Handlebars.compile(source);
    return template(data);
  } catch (error) {
    console.error(`Error compiling template ${templateName}:`, error);
    throw error;
  }
}
