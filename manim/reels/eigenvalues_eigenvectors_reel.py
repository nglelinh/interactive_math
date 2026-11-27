import json
import os
import sys
import numpy as np
from manim import *

sys.path.insert(0, os.path.dirname(__file__))
from common import *

# Math verification block
A = np.array([[3.0, 1.0], [0.0, 2.0]])
v1 = np.array([1.0, 0.0])
v2 = np.array([1.0, -1.0])
assert np.allclose(A @ v1, 3.0 * v1)
assert np.allclose(A @ v2, 2.0 * v2)
v_non = np.array([0.0, 1.0])
assert not np.allclose(A @ v_non, (A @ v_non)[1] * v_non)

VO_DUR_PATH = os.environ.get("VO_DUR_JSON", "")
VO_TIMELINE_PATH = os.environ.get("VO_TIMELINE_JSON", "")


class EigenvaluesReel(Scene):
    def construct(self):
        vo_durs = json.load(open(VO_DUR_PATH)) if VO_DUR_PATH and os.path.exists(VO_DUR_PATH) else {}
        timeline = []

        def start_vo(sid):
            t0 = float(self.time)
            timeline.append((sid, t0))
            return t0

        def end_vo(sid, t0, fallback):
            if sid in vo_durs:
                rem = vo_durs[sid] - (float(self.time) - t0) + 0.8
                self.wait(max(0.5, rem))
            else:
                self.wait(fallback)

        # s1: Hook & Matrix Transformation
        t0 = start_vo("s1")
        c = cap("Giá trị riêng & Vector riêng", size=36, color=GOLD)
        sub = para("Ma trận A biến đổi mọi vector...\nnhưng có những phương không bị xoay!", size=28, y=5.0, color=WHITE)
        axes = NumberPlane(x_range=[-4, 4, 1], y_range=[-4, 4, 1], x_length=6.4, y_length=6.4,
                           background_line_style={"stroke_color": "#2d3748", "stroke_width": 1}).move_to([0, -0.4, 0])
        mat_lbl = para("A = [[3, 1], [0, 2]]", size=28, y=3.6, color=BLUE)
        self.play(FadeIn(c), FadeIn(sub), Create(axes), FadeIn(mat_lbl), run_time=1.2)
        end_vo("s1", t0, 4.0)

        # s2: Non-eigenvector rotates
        t0 = start_vo("s2")
        c = swap_cap(self, c, cap("Vector thường bị xoay lệch hướng", size=34, color=RED))
        origin = axes.c2p(0, 0)
        vec_u = Arrow(origin, axes.c2p(0, 1), buff=0, color=WHITE, stroke_width=5)
        vec_Au = Arrow(origin, axes.c2p(1, 2), buff=0, color=RED, stroke_width=5)
        lbl_u = Text("u = (0, 1)", font=FONT, font_size=24, color=WHITE).next_to(vec_u.get_end(), LEFT, buff=0.15)
        lbl_Au = Text("Au = (1, 2)", font=FONT, font_size=24, color=RED).next_to(vec_Au.get_end(), RIGHT, buff=0.15)
        self.play(GrowArrow(vec_u), FadeIn(lbl_u), run_time=0.9)
        self.play(GrowArrow(vec_Au), FadeIn(lbl_Au), run_time=1.0)
        end_vo("s2", t0, 4.5)

        # s3: Eigenvectors stay on span
        t0 = start_vo("s3")
        wipe(self, keep=[c, axes, mat_lbl])
        c = swap_cap(self, c, cap("Vector riêng giữ nguyên phương!", size=34, color=GREEN))
        ev1 = Arrow(origin, axes.c2p(1, 0), buff=0, color=GOLD, stroke_width=5)
        a_ev1 = Arrow(origin, axes.c2p(3, 0), buff=0, color=GREEN, stroke_width=4)
        l_ev1 = Text("v1 = (1, 0) → Av1 = 3·v1 (λ1 = 3)", font=FONT, font_size=24, color=GREEN).move_to([0, -4.4, 0])
        ev2 = Arrow(origin, axes.c2p(1, -1), buff=0, color=BLUE, stroke_width=5)
        a_ev2 = Arrow(origin, axes.c2p(2, -2), buff=0, color=BLUE, stroke_width=4)
        l_ev2 = Text("v2 = (1, -1) → Av2 = 2·v2 (λ2 = 2)", font=FONT, font_size=24, color=BLUE).move_to([0, -5.2, 0])
        self.play(GrowArrow(ev1), GrowArrow(a_ev1), FadeIn(l_ev1), run_time=1.2)
        self.play(GrowArrow(ev2), GrowArrow(a_ev2), FadeIn(l_ev2), run_time=1.2)
        end_vo("s3", t0, 5.5)

        # s4: Summary
        t0 = start_vo("s4")
        wipe(self, keep=[c])
        c = swap_cap(self, c, cap("Tóm tắt: Av = λv", size=36, color=GOLD))
        summary = para(
            "• v ≠ 0 là vector riêng nếu Av song song v\n"
            "• λ là hệ số co giãn (giá trị riêng)\n"
            "• Phương trình đặc trưng: det(A - λI) = 0",
            size=28, y=0.5, color=WHITE
        )
        self.play(FadeIn(summary), run_time=1.0)
        end_vo("s4", t0, 4.5)

        if VO_TIMELINE_PATH:
            json.dump({"timeline": timeline, "total": float(self.time)}, open(VO_TIMELINE_PATH, "w"))
