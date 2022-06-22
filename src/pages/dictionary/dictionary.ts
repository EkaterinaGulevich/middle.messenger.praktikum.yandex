import { registerHelper } from 'handlebars';
import { createTmpClassName } from 'src/utils';
import { Component } from 'src/modules';
import { TJsonObject } from 'src/common-types';

import template from './dictionary.hbs';
import './dictionary.scss';

registerHelper('CG_dictionary_page', (options) => createTmpClassName(options, 'dictionary_page'));

const LINKS: { title: string; list: { link: string; name: string }[] }[] = [
  {
    title: 'Правовые базы, справочные правовые системы',
    list: [
      {
        name: 'Гарант',
        link: 'http://garant.ru',
      },
      { link: 'http://consultant.ru', name: 'Консультант Плюс' },
      { link: 'http://docs.cntd.ru', name: 'Кодекс ' },
      { link: 'http://kontur-normativ.ru', name: 'Норматив' },
    ],
  },
  {
    title: 'Полезные сайты государственных органов',
    list: [
      {
        link: 'http://solutions.fas.gov.ru',
        name: 'правовые акты Федеральной антимонопольной службы, судебные акты, решения по делам и проч.',
      },
      {
        link: 'http://nalog.ru/',
        name: 'официальный сайт налоговой службы, разъяснения ФНС, обязательные для применения',
      },
    ],
  },

  {
    title: 'Юридические социальные сети',
    list: [
      { link: 'http://zakon.ru/', name: 'первая социальная сеть для юристов' },
      { link: 'http://pravo.ru/', name: 'юридический портал' },
    ],
  },
  {
    title: 'Полезные сайты для юристов',
    list: [
      { link: 'http://ksrf.ru/', name: 'официальный сайт Конституционного Суда РФ' },
      { link: 'http://supcourt.ru/', name: 'официальный сайт Верховного Суда РФ' },
      { link: 'http://www.gcourts.ru/', name: 'поиск решений судов общей юрисдикции' },
      { link: 'http://rospravosudie.com/', name: 'картотека юристов, адвокатов, судей и судебных решений' },
      { link: 'http://sudact.ru/', name: 'судебные и нормативные акты РФ, поиск судебных решений' },
      { link: 'http://media-pravo.info/', name: 'база данных российской судебной практики по информационному праву' },
    ],
  },
];

export class DictionaryComponent extends Component<TJsonObject> {
  constructor(parentElemSelector: string) {
    super({}, parentElemSelector);
  }

  render() {
    return template({
      backPathname: '/chats',
      backMessage: 'Вернуться к чатам',
      links: LINKS,
    });
  }
}
