'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useDesignMode } from '@/context/design-mode';
import type { DesignOverrideKey } from '@/lib/design-store';

export function DraggableSection({
  storageKey,
  children,
}: {
  storageKey: DesignOverrideKey;
  children: React.ReactNode;
}) {
  const { isDesignMode, get, setOverride } = useDesignMode();
  const [dragging, setDragging] = useState(false);
  const startRef = useRef({ x: 0, y: 0, startX: 0, startY: 0 });

  const posStr = get(storageKey, '0,0');
  const parts = posStr.split(',').map(Number);
  const x = isNaN(parts[0]) ? 0 : parts[0];
  const y = isNaN(parts[1]) ? 0 : parts[1];

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesignMode) return;
      e.preventDefault();
      setDragging(true);
      startRef.current = { x, y, startX: e.clientX, startY: e.clientY };
    },
    [isDesignMode, x, y]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startRef.current.startX;
      const dy = e.clientY - startRef.current.startY;
      const newX = Math.round(startRef.current.x + dx);
      const newY = Math.round(startRef.current.y + dy);
      startRef.current = { x: newX, y: newY, startX: e.clientX, startY: e.clientY };
      setOverride(storageKey, `${newX},${newY}`);
    },
    [dragging, storageKey, setOverride]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isDesignMode) return;
      const t = e.touches[0];
      setDragging(true);
      startRef.current = { x, y, startX: t.clientX, startY: t.clientY };
    },
    [isDesignMode, x, y]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!dragging || !e.touches[0]) return;
      const t = e.touches[0];
      const dx = t.clientX - startRef.current.startX;
      const dy = t.clientY - startRef.current.startY;
      const newX = Math.round(startRef.current.x + dx);
      const newY = Math.round(startRef.current.y + dy);
      startRef.current = { x: newX, y: newY, startX: t.clientX, startY: t.clientY };
      setOverride(storageKey, `${newX},${newY}`);
    },
    [dragging, storageKey, setOverride]
  );

  if (!isDesignMode) return <>{children}</>;

  return (
    <div
      className="relative"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >
      <DragListeners
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setDragging(false)}
        active={dragging}
      />
      {isDesignMode && (
        <div
          className="absolute -top-1 left-0 z-10 rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-medium text-black"
          title="Sürüklə"
        >
          Sürüklə
        </div>
      )}
      {children}
    </div>
  );
}

function DragListeners({
  onMouseMove,
  onMouseUp,
  onTouchMove,
  onTouchEnd,
  active,
}: {
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: () => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
  active: boolean;
}) {
  const onMouseMoveRef = useRef(onMouseMove);
  const onMouseUpRef = useRef(onMouseUp);
  const onTouchMoveRef = useRef(onTouchMove);
  const onTouchEndRef = useRef(onTouchEnd);
  onMouseMoveRef.current = onMouseMove;
  onMouseUpRef.current = onMouseUp;
  onTouchMoveRef.current = onTouchMove;
  onTouchEndRef.current = onTouchEnd;

  useEffect(() => {
    if (!active) return;
    const handleMouseMove = (e: MouseEvent) => onMouseMoveRef.current(e);
    const handleMouseUp = () => onMouseUpRef.current();
    const handleTouchMove = (e: TouchEvent) => onTouchMoveRef.current(e);
    const handleTouchEnd = () => onTouchEndRef.current();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [active]);

  return null;
}
