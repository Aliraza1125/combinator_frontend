import { NewsArticle } from '../types/news';

export const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: "Saudi Arabia's Tech Boom: $6.4B Investment in Startup Ecosystem",
    summary: 'The Kingdom announces major initiative to boost local tech startups',
    content: 'Saudi Arabia has unveiled a groundbreaking $6.4B investment program to accelerate the growth of technology startups in the region. The initiative aims to establish the Kingdom as a leading hub for innovation in the Middle East.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=60',
    source: 'Tech MENA',
    sourceUrl: 'https://example.com/article1',
    publishedAt: '2024-03-15T08:00:00Z',
    tags: ['investment', 'saudi-arabia', 'tech']
  },
  {
    id: '2',
    title: "Dubai's FinTech Revolution: Local Startup Raises $50M Series B",
    summary: 'Leading UAE fintech platform secures major funding round',
    content: 'A Dubai-based financial technology startup has successfully raised $50M in Series B funding, marking one of the largest fintech investments in the MENA region this year.',
    imageUrl: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=800&auto=format&fit=crop&q=60',
    source: 'MENA Startup Weekly',
    sourceUrl: 'https://example.com/article2',
    publishedAt: '2024-03-14T10:30:00Z',
    tags: ['fintech', 'uae', 'funding']
  },
  {
    id: '3',
    title: 'Egyptian EdTech Startups Transform Regional Education',
    summary: "How Cairo's tech innovators are revolutionizing learning",
    content: 'Egyptian educational technology startups are leading a transformation in regional education, leveraging AI and mobile technology to make quality education more accessible across the Arab world.',
    imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&auto=format&fit=crop&q=60',
    source: 'EdTech Digest',
    sourceUrl: 'https://example.com/article3',
    publishedAt: '2024-03-13T14:15:00Z',
    tags: ['edtech', 'egypt', 'innovation']
  }
];