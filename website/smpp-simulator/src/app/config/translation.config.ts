import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BUILD_TIMESTAMP } from 'env/environment';
export const translationNotFoundMessage = 'translation-not-found';
import * as _ from 'lodash';

export class MissingTranslationHandlerImpl implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    const key = params.key;
    return _.startCase(_.last(key.split('.')));
    // `${translationNotFoundMessage}[${key}]`;
  }
}

export function translatePartialLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, 'assets/', `.json?buildTimestamp=${BUILD_TIMESTAMP ?? ''}`);
}

export function missingTranslationHandler(): MissingTranslationHandler {
  return new MissingTranslationHandlerImpl();
}
