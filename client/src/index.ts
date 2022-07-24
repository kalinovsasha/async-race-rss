import '../src/styles/styles.scss';
import { Header } from './components/Header/header';
import { GarageControls } from './components/GarageControls/GarageControls';

const rootEl = document.getElementById('root')!;
const header = new Header(rootEl);
const garage = new GarageControls(rootEl);
