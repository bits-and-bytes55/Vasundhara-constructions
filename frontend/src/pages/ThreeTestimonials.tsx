import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Box } from '@react-three/drei';
import { Group as ThreeGroup, Vector3 } from 'three';

// Type definition for a testimonial
interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

// Props for the Card component
interface CardProps {
  position: Vector3 | [number, number, number];
  testimonial: Testimonial;
  index: number;
}

// Sample testimonial data (you can move this outside or pass as props)
const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    text: "The team built an incredible app that doubled our user engagement. Truly world-class development.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Michael Chen",
    role: "CTO, FinTech Solutions",
    text: "Their expertise in cross-platform development saved us months of work. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager, HealthCare App",
    text: "Amazing attention to detail and user experience. The app feels native on both iOS and Android.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "David Kim",
    role: "Founder, E‑commerce Platform",
    text: "From concept to launch, they were with us every step. The final product exceeded our expectations.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

// Individual card component (unchanged)
const Card: React.FC<CardProps> = ({ position, testimonial }) => {
  return (
    <group position={position}>
      {/* Card background */}
      <Box args={[2.5, 3, 0.1]}>
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.5}
          roughness={0.2}
          emissive="#1e293b"
          emissiveIntensity={0.2}
        />
      </Box>

      {/* HTML overlay for text and avatar */}
      <Html position={[0, 0.9, 0.06]} center transform style={{ width: 180, textAlign: 'center', pointerEvents: 'none' }}>
        <div
          style={{
            background: 'rgba(15,23,42,0.9)',
            backdropFilter: 'blur(4px)',
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#fff',
            fontSize: '12px',
            fontFamily: 'DM Sans, sans-serif',
            maxWidth: '200px',
          }}
        >
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            style={{ width: 40, height: 40, borderRadius: '50%', marginBottom: 8 }}
          />
          <div style={{ fontWeight: 'bold', color: '#3b82f6' }}>{testimonial.name}</div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 8 }}>{testimonial.role}</div>
          <div style={{ fontSize: 11, lineHeight: 1.4 }}>"{testimonial.text.slice(0, 80)}..."</div>
        </div>
      </Html>
    </group>
  );
};

// Props for the main component
interface ThreeTestimonialsProps {
  testimonials?: Testimonial[];
  rotationSpeed?: number;
  radius?: number;
};

// NEW: Inner component that uses useFrame
interface RotatingCardsProps {
  testimonials: Testimonial[];
  rotationSpeed: number;
  radius: number;
}

function RotatingCards({ testimonials, rotationSpeed, radius }: RotatingCardsProps) {
  const groupRef = useRef<ThreeGroup>(null);
  const total = testimonials.length;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {testimonials.map((testimonial, i) => {
        const angle = (i / total) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Card
            key={i}
            position={[x, 0, z]}
            testimonial={testimonial}
            index={i}
          />
        );
      })}
    </group>
  );
}

// Main component – only renders Canvas and outer UI
export default function ThreeTestimonials({
  testimonials: customTestimonials,
  rotationSpeed = 0.005,
  radius = 3.5,
}: ThreeTestimonialsProps) {
  const data = customTestimonials || testimonials;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        background: '#060912',
        overflow: 'hidden',
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <RotatingCards
          testimonials={data}
          rotationSpeed={rotationSpeed}
          radius={radius}
        />
      </Canvas>

      {/* Optional overlay text (unchanged) */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          color: '#94a3b8',
          fontSize: 12,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            background: '#0f172a80',
            padding: '6px 12px',
            borderRadius: 20,
            backdropFilter: 'blur(4px)',
          }}
        >
          ✨ Real stories from our clients ✨
        </span>
      </div>
    </div>
  );
}