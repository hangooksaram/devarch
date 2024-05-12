export type SearchHelperContentType = 'multiple' | 'single';

export interface SearchHelper {
    searchText : SearchText,
    helperContent : SearchHelperContent
}

export interface SearchHelperContent {
  type: SearchHelperContentType;
  content: (a: string, b?: string) => string;
}


export interface SearchText {
    first?:string;
    second?:string;
    final?:string;
}

