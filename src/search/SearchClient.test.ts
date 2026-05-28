import LZString from 'lz-string';

import SearchClient from './SearchClient';

const searchPayload = {
  courses: [
    {
      code: 'CS135',
      name: 'Designing Functional Programs',
      profs: ['Ada Lovelace'],
      rating_count: 10,
    },
    {
      code: 'MATH135',
      name: 'Algebra for Honours Mathematics',
      profs: null,
      rating_count: 2,
    },
  ],
  profs: [
    {
      courses: ['CS135'],
      name: 'Ada Lovelace',
      rating_count: 5,
    },
  ],
};

describe('SearchClient', () => {
  it('builds compressed indices and serves autocomplete results', async () => {
    const client = new SearchClient();
    const indexedAt = new Date('2026-01-01T00:00:00.000Z');
    const [compressedData, returnedDate] = await client.buildIndices(
      LZString.compressToUTF16(JSON.stringify(searchPayload)),
      indexedAt,
    );

    expect(returnedDate).toBe(indexedAt);
    expect(LZString.decompressFromUTF16(compressedData)).toBe(
      JSON.stringify(searchPayload),
    );

    const results = client.autocomplete('cs 135');

    expect(results.courseResults[0].code).toBe('CS 135');
    expect(results.profResults[0].name).toBe('Ada Lovelace');
    expect(results.courseCodeResults[0].code).toBe('CS');
  });
});
