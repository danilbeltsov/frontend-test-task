import { BannerCard } from '@shared/types/banner-card.type';

export const mockBannerImages: BannerCard[] = [
  {
    background: 'assets/carousel-images/winz-bg.webp',
    image: 'assets/carousel-images/winz-img.png',
    title: 'WinzUp Loyalty Program',
    description:
      'Get up to <strong>35% in rewards</strong>: daily rakeback, weekly cashback and level-up bonuses',
    buttonText: 'Join Now',
  },
  {
    background: 'assets/carousel-images/valentine-bg.png',
    image: 'assets/carousel-images/valentine-img.png',
    title: "Valentine's Fortune Drops",
    description:
      'Trigger random prizes and win a share of <strong>€30,000!</strong>',
    buttonText: 'Learn more',
  },
  {
    background: 'assets/carousel-images/wheel-bg.webp',
    image: 'assets/carousel-images/wheel-img.png',
    title: 'Wheel of Winz',
    description: 'Spin the wheel to win up to <strong>€15,000</strong> weekly',
    buttonText: 'Spin now',
  },
];
