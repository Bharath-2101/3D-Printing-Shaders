# Printing Effect in shaders

Firstly, Create a React app with Vite or run the below commands:

```bash
#Creating the latest version of Vite

npm create vite@latest

#Select the Options you need for installation.Select react for using R3F for faster development.

```

After, Initialising the Project do following things.

<ol>
<li>Add <strong>Three , React Three Fibre , React three drei</strong> dependencies.</li>

<li>Add Canvas and place a mesh with plane Geometry and shaderMaterial.</li>
<li>For better scalability add seperate files of Fragment and Vertex shaders.</li>
<li>Changing the files content for getting desired value.</li>
</ol>

<br/>
<br/>

# Step-1:

```bash
# Install The following packages. React-three/drei is useful for many ready made utilites for rapid development and leva for useControls where we can tweak the values of various fields for better results

npm install three @react-three/fiber @react-three/drei leva

```

<br/>
<br/>

# Step-2:

Add Canvas with plane mesh for knowing our project is running good.

```jsx
<Canvas>
  <mesh>
    <planeGeometry args={[1, 1, 50, 50]} />
    <meshBasicMaterial color={"red"} />
  </mesh>
</Canvas>
```

If a red Cubic Plane is appearing on the Screen then the project is running good.
Later, Replace the meshBasicMaterial with

```jsx
<meshBasicMaterial color={"red"} />

// to

<shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} />
```

<br/>
<br/>

# Step-3:

Create two files with names of Fragment.js and Vertex.js and add following code for now:

### Fragment.js:

```javascript
const Fragment = `
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vUv.x,vUv.y,0.,1.);
}
`;

export { Fragment };
```

<br/>

### Vertex.js:

```javascript
const Vertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export { Vertex };
```

By adding the code and exporting them into the shaderMaterial will gives a Linear gradient on Plane. If you guys not getting the code i would recommend to watch <a href="https://youtu.be/xZM8UJqN1eY?si=bttWpA9P-Cjk6Pn6" target="_blank">Shaders Tutorial</a> . It is just 26 minute tutorial with clear understanding.

<br/>
<br/>

# Step-4:

After Getting a Linear Gradient.We don't need to alter anything Vertex.js unless we want any changes in Geometry. Now, Focus on Fragment.js we need some uniforms from the react into shaders they are texture which a image for printing and and a progress value (we can hardcode it if we don't pass it)

### App.jsx

```jsx
// imports
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";


// Add in component
const mesh=useRef();

const texture=useLoader(TextureLoader,'/image.png');

const uniforms=useRef({
    u_texture:{
        value:texture
    }
})

<mesh ref={mesh} scale={scale}>
        <planeGeometry />
        <shaderMaterial vertexShader={Vertex} fragmentShader={Fragment} uniforms={uniforms.current} />
 </mesh>
```

Now, By using above code we can the image into the shader.After we want add some code for showing the image on the plane.

### Fragment.jsx

```javascript
const Fragment = `
varying vec2 vUv;
uniform sampler2D u_texture; //must be the same name given uniforms

void main() {
   vec4 Color=texture2D(u_texture,vUv);
    gl_FragColor = Color;
}
`;

export { Fragment };
```

Now we are able to see a Image on the Plane.

<br/>
<br/>

# Step-5:

Now is the time for printing effect. We need a uniform of progress and u_time(which is also speed of progress according to the time) from javascript or we can hardcode the progress in shaders.

### App.jsx

```jsx
// imports
import { useFrame } from "react-three/drei";

// Add in component.
const uniforms = useRef({
  u_texture: {
    value: texture,
  },
  u_time: {
    value: 0,
  },
});

useFrame((state) => {
  const { clock } = state;
  mesh.current.material.u_time.value = clock.getElapsedTime();
}); //It passes the current time of program from start in 60FPS
```

### Fragment.js

```javascript
const Fragment = `
varying vec2 vUv;

uniform sampler2D u_texture;

uniform float u_time; 

float speed=0.2;

void main() {
    float progress =1.0 -fract(u_time * speed); //For Revealing Part

    float s = 1.0 - step(vUv.y, progress); //For Revealing direction

    vec4 texColor = texture2D(u_texture, vUv);

    texColor.w *= s; //We multiply it with aplha channel or opacity channel for progression feel

    gl_FragColor = texColor;

}
  `;

export { Fragment };
```

You can tweak the values for making the speed of progression by changing speed value and direction by changing .y to .x and also you can play with rgb channels instead of alpha channel.

<br/>
<br/>

<h1 align='center'>If i miss anything to explain notice to me I will try.</h1>
