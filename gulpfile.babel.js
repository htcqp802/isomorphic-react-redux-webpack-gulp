import gulp from 'gulp';
import webpackConfig from './conf/webpack.conf.js';
import webpack from 'webpack';
import del from 'del';
import gutil from 'gulp-util';

gulp.task('clean', () => {
	return del('build/**/*');
})

gulp.task('webpack:dist', done => {
	webpackWrapper(false, webpackConfig, done);
});

gulp.task('webpack:dev', done => {
	webpackWrapper(true, webpackConfig, done);
})

const webpackWrapper = (watch, conf, done) => {
	const webpackBundler = webpack(conf);
	const webpackChangeHandler = (err, stats) => {
		if (err) {
			errorHandler('Webpack')(err);
		}
		gutil.log(stats.toString({
			colors: true,
			chunks: false,
			hash: false,
			version: false
		}));
		if (done) {
			done();
			done = null;
		}
	};

	if (watch) {
		webpackBundler.watch(200, webpackChangeHandler);
	} else {
		webpackBundler.run(webpackChangeHandler);
	}
}

const errorHandler = (title) => {
	return function(err) {
		gutil.log(gutil.colors.red(`[${title}]`), err.toString());
		this.emit('end');
	};
};

gulp.task('build', ['clean', 'webpack:dist']);
gulp.task('dev', ['clean', 'webpack:dev']);