import React, { FC } from 'react';
import { Container } from '@components/ui';
import { ArrowRight } from '@components/icons';
import s from './Hero.module.css';
import Link from 'next/link';
interface HeroProps {
  className?: string;
  headline: string;
  description: string;
}

const Hero: FC<HeroProps> = ({ headline, description }) => {
  return (
    <div className="border-t border-b bg-accent-9 border-accent-2">
      <Container>
        <div className={s.root}>
          <h2 className={s.title}>{headline}</h2>
          <div className={s.description}>
            <p>{description}</p>
            <Link href="/">
              <a className="flex items-center pt-3 font-bold cursor-pointer text-accent-0 hover:underline w-max-content">
                Read it here
                <ArrowRight width="20" heigh="20" className="ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
