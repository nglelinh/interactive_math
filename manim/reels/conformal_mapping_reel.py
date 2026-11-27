import json
import os
import sys
import numpy as np
from manim import *

sys.path.insert(0, os.path.dirname(__file__))
from common import *

# Math verification block: w = z^2 preserves 90-degree intersections away from z=0
z0 = 1.0 + 1.0j
w0 = z0 ** 2
assert np.isclose(w0, 0.0 + 2.0j)

VO_DUR_PATH = os.environ.get("VO_DUR_JSON", "")
VO_TIMELINE_PATH = os.environ.get("VO_TIMELINE_JSON", "")


class ConformalReel(Scene):
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

        # s1: z-plane grid
        t0 = start_vo("s1")
        c = cap("Ánh xạ bảo giác (Conformal)", size=36, color=GOLD)
        sub = para("Hàm giải tích f(z) với f'(z) ≠ 0\nbảo toàn góc giao nhau giữa các đường cong", size=27, y=4.7, color=WHITE)
        grid = NumberPlane(x_range=[0.2, 2.2, 0.5], y_range=[0.2, 2.2, 0.5], x_length=4.8, y_length=4.8,
                           background_line_style={"stroke_color": BLUE, "stroke_width": 2}).move_to([0, 0.2, 0])
        lbl = Text("Mặt phẳng z: các đường cắt vuông góc 90°", font=FONT, font_size=24, color=BLUE).move_to([0, -3.1, 0])
        self.play(FadeIn(c), FadeIn(sub), Create(grid), FadeIn(lbl), run_time=1.3)
        end_vo("s1", t0, 4.5)

        # s2: w = z^2 mapping
        t0 = start_vo("s2")
        c = swap_cap(self, c, cap("Biến đổi w = z² vẫn giữ góc 90°", size=34, color=GREEN))
        curved = VGroup()
        for u in np.linspace(0.4, 2.0, 5):
            pts = [np.array([(u**2 - v**2) * 0.55, (2 * u * v) * 0.55 - 1.2, 0]) for v in np.linspace(0.4, 2.0, 20)]
            curved.add(VMobject(color=GREEN, stroke_width=2.5).set_points_smoothly(pts))
        for v in np.linspace(0.4, 2.0, 5):
            pts = [np.array([(u**2 - v**2) * 0.55, (2 * u * v) * 0.55 - 1.2, 0]) for u in np.linspace(0.4, 2.0, 20)]
            curved.add(VMobject(color=GOLD, stroke_width=2.5).set_points_smoothly(pts))
        lbl2 = Text("Mặt phẳng w = z²: đường thẳng uốn cong, góc vẫn 90°!", font=FONT, font_size=24, color=GOLD).move_to([0, -3.1, 0])
        self.play(ReplacementTransform(grid, curved), ReplacementTransform(lbl, lbl2), run_time=1.5)
        end_vo("s2", t0, 5.0)

        # s3: Summary
        t0 = start_vo("s3")
        wipe(self, keep=[c])
        c = swap_cap(self, c, cap("Ứng dụng ánh xạ bảo giác", size=34, color=GOLD))
        sum_txt = para(
            "• Điều kiện bảo giác: f giải tích và f'(z₀) ≠ 0\n"
            "• Tại z₀ = 0 với w = z², góc bị nhân đôi (không bảo giác)\n"
            "• Ứng dụng: khí động học, trường tĩnh điện, bản đồ",
            size=27, y=0.5, color=WHITE
        )
        self.play(FadeIn(sum_txt), run_time=1.0)
        end_vo("s3", t0, 4.5)

        if VO_TIMELINE_PATH:
            json.dump({"timeline": timeline, "total": float(self.time)}, open(VO_TIMELINE_PATH, "w"))
