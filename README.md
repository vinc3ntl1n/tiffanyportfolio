.navbar {
  display: flex;
  justify-content: center;
  gap: 2.2rem;
  padding: 0.7rem 0;
  background: var(--primary-color);
  align-items: center;
  min-height: 4.2rem;
  flex-wrap: nowrap;
}

.nav-link {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--text-light);
  text-transform: uppercase;
  padding: 0.5rem 1.2rem;
  border-radius: 0;
  min-width: 8.5rem;
  flex-basis: 8.5rem;
  text-align: center;
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.2s ease,
              font-weight 0.15s ease;
}

.nav-link:hover {
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.08);
}

.nav-link.active {
  font-weight: 900;
  transform: scale(1.25);
  background: none;
  box-shadow: none;
}

.layout--dark .nav-link {
  color: var(--text-light);
}