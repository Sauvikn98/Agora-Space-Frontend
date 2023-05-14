import { keyframes } from '@emotion/react';
import { io } from 'socket.io-client'

export const socket = io('http://127.0.0.1:5000', {autoConnect: true});

export const fadeInUp = keyframes`
0% {
    -webkit-transform: translate3d( 0, 100%, 0 );
    opacity: 0;
    transform: translate3d( 0, 100 %, 0 )
}

to {
    -webkit-transform: translateZ( 0 );
    opacity: 1;
    transform: translateZ( 0 )
}`;

export const fadeInRight = keyframes`
0% {
    -webkit-transform: translate3d(100%,0,0);
    opacity: 0;
    transform: translate3d(100%,0,0)
}

to {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0)
}`;

export const fadeInLeft = keyframes`
0% {
    -webkit-transform: translate3d(-100%,0,0);
    opacity: 0;
    transform: translate3d(-100%,0,0)
}

to {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0)
}`;

export const fadeInDownShorter = keyframes`
from {
    opacity: 0;
    transform: translate(0,-50px);
    transform-origin: 0 0;
}

to {
    opacity: 1;
    transform: none
}`;

export const fadeInDownShorter2 = keyframes`
from {
    opacity: 0;
    transform: translate(0,-30px);
    transform-origin: 0 0;
}

to {
    opacity: 1;
    transform: none
}`;

export const maskRight = keyframes`{
  from {
      transform: translate(-100%,0)
  }
  to {
      transform: translate(0,0)
  }
}`;

export const slideInUp = keyframes`{
  0% {
      transform: translate3d(0, 100%, 0);
      visibility: visible
  }

  to {
      transform: translateZ(0)
  }
}`;

export const slideInDown = keyframes`{
  0% {
      transform: translate3d(0, -100%, 0);
      visibility: visible
  }

  to {
      transform: translateZ(0)
  }
}`;

export const timeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((  - timestamp) / 1000);
    if (seconds < 60) {
        return 'just now';
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
}

