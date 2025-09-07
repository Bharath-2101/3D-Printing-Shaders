const Fragment = `
varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_time;
uniform float u_speed;

void main() {
    float progress = abs(1.0 - 2.0 * fract(u_time * u_speed));
    float s = 1.0 - step(vUv.y, progress);
    vec4 texColor = texture2D(u_texture, vUv);
    texColor.w *= s;
    gl_FragColor = texColor;
}
  `;

export { Fragment };
