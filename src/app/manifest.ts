import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Future Focus Company',
    short_name: 'Future Focus',
    description: 'Government Approved Recruitment Agency (RL-1428) in Bangladesh connecting skilled talent with Saudi Arabia & Middle East.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
