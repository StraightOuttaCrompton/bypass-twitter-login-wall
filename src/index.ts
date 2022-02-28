import hideLoginBar from './hideLoginBar';
import removeLoginWall from './removeLoginWall';

hideLoginBar();
setInterval(() => {
    removeLoginWall();
}, 1000);
