varying vec2 vUv;
varying float vNoise;

uniform float time;
uniform sampler2D oceanTexture;

void main()	{
	// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

	// vec3 color1 = vec3(1., 0., 0.);
	// vec3 color2 = vec3(0., 0., 1.);
	// vec3 finalcolor = mix(color1, color2, (vNoise + 1.) * 0.5);

	vec2 newUV = vUv;

	newUV = vec2(newUV.x, newUV.y + 0.01 * sin(newUV.x * 10. + time));

	vec4 oceanView = texture2D(oceanTexture, newUV);

  float dist = distance(vUv, vec2(0.5));
	vec3 color = vec3(dist);

	// gl_FragColor = vec4(vUv, 0., 1.);
	// gl_FragColor = vec4(finalcolor, 1.);
	// gl_FragColor = vec4(oceanView);
	gl_FragColor = vec4(color, 1.);
	// gl_FragColor = vec4(1.);
}