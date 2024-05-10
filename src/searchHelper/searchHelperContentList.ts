export const searchHelperContentList: SearchHelperContent[] = [
    { type: 'multiple', content: (a, b) => `What is difference between ${a} and ${b}?` },
    { type: 'multiple', content: (a, b) => `${a} vs ${b} which is better?` },
    { type: 'single', content: (a) => `${a} best practices` },
    { type: 'single', content: (a) => `What is advantage of ${a}?` },
    { type: 'single', content: (a) => `What is disadvantage of ${a}?` },
    { type: 'single', content: (a) => `Best ${a} 2024` },
    { type: 'single', content: (a) => `Top 10 ${a} 2024` },
  ];
  