import styled, { keyframes } from "styled-components";

const sweep = keyframes`
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
`;

export const Bar = styled.div`
  position: fixed;
  inset-block-start: 0;
  top: 0;
  height: 0.35rem;
  width: 100vw;
  background: transparent;
  overflow: hidden;
  z-index: 100;
`;

export const Sweep = styled.span`
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: 0% 50%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--brand50) 25%,
    var(--brand50) 75%,
    transparent 100%
  );
  animation: ${sweep} 1.5s infinite linear;
`;
