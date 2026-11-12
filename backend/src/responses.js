import path from 'node:path';
import { GoogleAuth } from 'google-auth-library';
import { forms } from '@googleapis/forms';

import formInfo from '../env/form-info.env.json' with { type: 'json' };

const auth = new GoogleAuth({
  keyFile: path.join(import.meta.dirname, '../env/service-account.env.json'),
  scopes: 'https://www.googleapis.com/auth/forms.responses.readonly',
});

const formsClient = forms({
  version: 'v1',
  auth,
});

export async function getFormResponses() {
  return (
    await formsClient.forms.responses.list({ 
      formId: formInfo.formId
    })
  ).data;
}

function parseResponse(response) {
  const result = { entryID : response.responseId, submitTime : Date.parse(response.createTime) };

  for(const answer of Object.values(response.answers)) {
    const field = formInfo.questionIDsToFields[answer.questionId];
    const fieldName = field.fieldName;
    let value = answer.textAnswers.answers[0].value;

    value = (field.answerTranslations ?? [])[value] ?? value;

    result[fieldName] = value;
  }

  return result;
}

export async function getKaraokeEntries(time) {
  const results = await getFormResponses();

  console.log(`Getting Karaoke Entries from ${time}`);

  let newSignups = (results.responses ?? [])
    .filter(response => new Date(response.createTime) >= time)
    .map(parseResponse)

  let updatedSignups = (results.responses ?? [])
    .filter(response => new Date(response.createTime) < time)
    .filter(response => new Date(response.lastSubmittedTime) >= time)
    .map(parseResponse);

  return {
    newSignups,
    updatedSignups
  };
}