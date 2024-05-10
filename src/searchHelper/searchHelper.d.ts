type SearchHelperType = 'multiple' | 'single';

interface SearchHelperContent {
  type: SearchHelperType;
  content: (a: string, b?: string) => string;
}
