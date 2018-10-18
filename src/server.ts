import express from 'express';

const app = express();
const router = express.Router();

app.use(router);
app.use('/public', express.static('public'));

router.get('/', (req, res) => {
    // browser-sync works properly only when there is document. If we operate on API files then it doesn't work.
    res.send(
        '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<title>Hello world</title>' +
            '<link rel="stylesheet" type="text/css" href="public/style.css">' +
            '</head>' +
            '<body>' +
            '<p>Hello World!</p>' +
            '</body>' +
            '</html>'
    );
});

// tslint:disable-next-line
app.listen(4002, () => console.log('Example app listening on port 4002!'));
