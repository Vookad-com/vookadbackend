import app from './app';
import { fireAuth, myapp } from './firebase';

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});