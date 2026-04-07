import '../styles/fonts.css'; 
import '../styles/variables.css';
import '../styles/light.css';
import '../styles/dark.css';
import '../styles/scrollbar.css';
import '../styles/animations.css';
import style from './app.module.css';

import { useTheme } from '../hooks/useTheme';
import { useScrollbar } from '../hooks/useScrollbar';

import { Dictionary } from '../pages/Dictionary';

export const App = () => {
  useTheme();
  useScrollbar();

  return (
    <div className={style.page}>
      <Dictionary />
    </div>
  );
};