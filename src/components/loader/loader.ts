import { registerPartial } from 'handlebars';

import template from './loader.hbs';
import './loader.scss';

registerPartial('loader', template);

export const LoaderTpl = template;
