import json
import os
import sys
import numpy as np
from manim import *

sys.path.insert(0, os.path.dirname(__file__))
from common import *

# Math verification block
p1 = np.array([-1.5, -0.5, 0.0])
p2 = np.array([1.5, 0.8, 0.0])
mid = 0.5 * p1 + 0.5 * p2
assert np.allclose(mid, np.array([0.0, 0.15, 0.0]))

VO_DUR_PATH = os.environ.get("VO_DUR_JSON", "")
VO_TIMELINE_PATH = os.environ.get("VO_TIMELINE_JSON", "")


class ConvexSetsReel(Scene):
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

        # s1: Convex Set
        t0 = start_vo("s1")
        c = cap("Tập lồi & Siêu phẳng tách", size=36, color=GOLD)
        ell = Ellipse(width=5.4, height=3.4, color=GREEN, fill_color=GREEN, fill_opacity=0.25).move_to([0, 0.4, 0])
        d1 = Dot([-1.4, 0.0, 0], color=GOLD)
        d2 = Dot([1.5, 0.9, 0], color=GOLD)
        seg = Line(d1.get_center(), d2.get_center(), color=GOLD, stroke_width=4)
        lbl = para("Tập lồi: đoạn thẳng nối 2 điểm bất kỳ\nluôn nằm trọn bên trong tập hợp", size=28, y=-2.8, color=WHITE)
        self.play(FadeIn(c), Create(ell), FadeIn(d1), FadeIn(d2), Create(seg), FadeIn(lbl), run_time=1.3)
        end_vo("s1", t0, 4.5)

        # s2: Non-convex counterexample
        t0 = start_vo("s2")
        wipe(self, keep=[c])
        c = swap_cap(self, c, cap("Phản ví dụ: Tập không lồi", size=34, color=RED))
        crescent = Polygon([-2.2, 1.6, 0], [-0.8, 1.6, 0], [-0.8, -0.5, 0], [0.8, -0.5, 0], [0.8, 1.6, 0], [2.2, 1.6, 0], [2.2, -1.6, 0], [-2.2, -1.6, 0],
                           color=RED, fill_color=RED, fill_opacity=0.22)
        pA = Dot([-1.5, 1.1, 0], color=GOLD)
        pB = Dot([1.5, 1.1, 0], color=GOLD)
        bad_seg = Line(pA.get_center(), pB.get_center(), color=GOLD, stroke_width=4)
        lbl2 = para("Đoạn nối bị lọt ra ngoài vùng tập hợp\n→ bài toán tối ưu dễ mắc kẹt cực trị địa phương", size=26, y=-3.2, color=WHITE)
        self.play(Create(crescent), FadeIn(pA), FadeIn(pB), Create(bad_seg), FadeIn(lbl2), run_time=1.3)
        end_vo("s2", t0, 4.5)

        # s3: Separating Hyperplane
        t0 = start_vo("s3")
        wipe(self, keep=[c])
        c = swap_cap(self, c, cap("Định lý siêu phẳng tách", size=34, color=BLUE))
        sA = Circle(radius=1.2, color=GREEN, fill_color=GREEN, fill_opacity=0.28).move_to([-1.8, 0.5, 0])
        sB = Circle(radius=1.2, color=BLUE, fill_color=BLUE, fill_opacity=0.28).move_to([1.8, 0.5, 0])
        hp = Line([0, -2.0, 0], [0, 3.0, 0], color=GOLD, stroke_width=5)
        lbl3 = para("Hai tập lồi rời nhau luôn tách được\nbởi một siêu phẳng aᵀx = b (nền tảng của SVM)", size=26, y=-3.2, color=WHITE)
        self.play(Create(sA), Create(sB), Create(hp), FadeIn(lbl3), run_time=1.3)
        end_vo("s3", t0, 5.0)

        if VO_TIMELINE_PATH:
            json.dump({"timeline": timeline, "total": float(self.time)}, open(VO_TIMELINE_PATH, "w"))
