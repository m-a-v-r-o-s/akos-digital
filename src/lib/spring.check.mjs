// Self-check for spring.js: `node spring.check.mjs`. `--css` prints the tokens for mobile-feel.css.
import assert from 'node:assert';
import { appleSpring, rubberband, project, velocityTracker, springTo, springEasing } from './spring.js';

const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
// rubber band equals the reel's form (1 - 1/(c*x/d + 1)) * d and is capped by d
near(rubberband(300, 844), (1 - 1 / ((0.55 * 300) / 844 + 1)) * 844);
assert.ok(rubberband(1e9, 844) < 844 && rubberband(-300, 844) < 0);
near(project(1000), 499, 1e-9);
// bounce maps to damping ratio 1 - bounce (reel: .smooth 1.0, .snappy 0.85, .bouncy 0.70)
for (const [b, ratio] of [[0, 1], [0.15, 0.85], [0.3, 0.7]]) {
  const { stiffness, damping } = appleSpring(0.5, b);
  near(damping / (2 * Math.sqrt(stiffness)), ratio);
}
const peak = (s) => Math.max(...s.easing.slice(7, -1).split(', ').map(Number));
assert.ok(peak(springEasing(0.5, 0)) <= 1, 'smooth must not overshoot');
assert.ok(peak(springEasing(0.5, 0.3)) > 1.02, 'bouncy must overshoot');
// springTo settles on target and keeps velocity when retargeted mid-flight
const st = { x: 0, v: 0 };
await new Promise((done) => springTo(st, 100, { bounce: 0.15, onDone: done }));
near(st.x, 100);
const vt = velocityTracker(); vt.add(0, 0); vt.add(50, 50);
near(vt.get(), 1000);
if (process.argv.includes('--css')) {
  for (const [name, b] of [['smooth', 0], ['snappy', 0.15], ['bouncy', 0.3]]) {
    const s = springEasing(0.5, b);
    console.log(`  --spring-${name}: ${s.easing};\n  --spring-${name}-ms: ${s.ms}ms;`);
  }
} else console.log('spring.js ok');
