import * as fetch from 'node-fetch';
import * as net from 'net';

export default (ctx: any): void => {
  if (ctx.chat.type !== 'private') {
    ctx.reply(ctx.i18n.t('individual'), { reply_to_message_id: ctx.message.message_id });
    return;
  }

  const text = ctx.message.text.replace(/\s{2,}/, ' ').split(' ');

  if (text[1]) {
    if (!text[1]
      .replace(/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, '')
      .replace(/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, '')
      .replace(/^192\.168\.\d{1,3}\.\d{1,3}$/, '')
      .replace(/^0\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, '')
    ) {
      ctx.reply(ctx.i18n.t('notQuery'), { reply_to_message_id: ctx.message.message_id });
    } else if (net.isIP(text[1]) === 0) {
      ctx.reply(ctx.i18n.t('IPQueryProblem'), { reply_to_message_id: ctx.message.message_id });
    } else {
      ctx.reply(ctx.i18n.t('Querying'), { reply_to_message_id: ctx.message.message_id }
      ).then((message) => {
        fetch(encodeURI(`https://api.ip.sb/geoip/${text[1]}`))
          .then((res) => res.json())
          .then((json) => {
              if (json.code) {
                ctx.telegram.editMessageText(
                  message.chat.id,
                  message.message_id,
                  undefined,
                  ctx.i18n.t('InputIP'),
                );
              } else {
                ctx.telegram.editMessageText(
                  message.chat.id,
                  message.message_id,
                  undefined,
                  `Organization: ${json.organization || 'no'}
Longitude: ${json.longitude || 'no'}
City: ${json.city || 'no'}
Timezone: ${json.timezone || 'no'}
ISP: ${json.isp || 'no'}
Region: ${json.region || 'no'}
ASN: ${json.asn || 'no'}
ASN Organization: ${json.asn_organization || 'no'}
Country: ${json.country || 'no'}
IP: ${json.ip || 'no'}`, { reply_to_message_id: ctx.message.message_id },
                );
              }
          });
      });
    }
  } else {
    ctx.replyWithMarkdown(ctx.i18n.t('IPQueryHelp'), { reply_to_message_id: ctx.message.message_id });
  }
}
