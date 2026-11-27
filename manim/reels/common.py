"""Shared config + helpers for vertical 9:16 Manim reels (1080x1920, no music).

Frame is 9 x 16 units (1 unit = 120 px). Safe area: |x| <= 4, -6.5 <= y <= 6.8.
Text only (Unicode) -> no LaTeX needed. Do NOT use MathTex/Tex/DecimalNumber/Integer.
"""
import os
from manim import *
import numpy as np

config.pixel_width = 1080
config.pixel_height = 1920
config.frame_width = 9
config.frame_height = 16
config.background_color = "#0e0e10"

GOLD = "#f5c542"
DIM = "#8a8d93"
RED = "#ff6b6b"
BLUE = "#6cb6ff"
GREEN = "#6bd68a"
CELL = "#1a1b20"
FONT = os.environ.get("REEL_FONT", "DejaVu Sans")
CAP_Y = 6.3


def cap(text, size=36, color=WHITE):
    """One-line caption at the top of the frame (section title)."""
    t = Text(text, font=FONT, font_size=size, color=color)
    if t.width > 8.0:
        t.scale_to_fit_width(8.0)
    return t.move_to([0, CAP_Y, 0])


def swap_cap(scene, old, new, rt=0.45):
    scene.play(ReplacementTransform(old, new), run_time=rt)
    return new


def para(text, size=30, color=WHITE, y=0.0, x=0.0, w=7.8, **kw):
    """Multi-line paragraph ("\\n" breaks lines), auto-shrinks if wider than w."""
    m = Text(text, font=FONT, font_size=size, color=color, line_spacing=1.1, **kw)
    if m.width > w:
        m.scale_to_fit_width(w)
    return m.move_to([x, y, 0])


def fitw(m, w=7.8):
    if m.width > w:
        m.scale_to_fit_width(w)
    return m


def wipe(scene, keep=(), rt=0.5):
    """Fade out everything on screen except `keep` (use between sections)."""
    mobs = [m for m in scene.mobjects if m not in keep]
    if mobs:
        scene.play(*[FadeOut(m) for m in mobs], run_time=rt)


def num(value, size=30, color=WHITE):
    """A number as plain Text (instead of Integer/DecimalNumber, which need LaTeX)."""
    return Text(str(value), font=FONT, font_size=size, color=color)
