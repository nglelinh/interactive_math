import json
import os
import sys
import numpy as np
from manim import *

sys.path.insert(0, os.path.dirname(__file__))
from common import *

# Math verification block: square wave odd harmonics 4/(pi*k)*sin(k*x)
xs = np.linspace(0, 2 * np.pi, 200)
y1 = (4 / np.pi) * np.sin(xs)
y3 = y1 + (4 / (3 * np.pi)) * np.sin(3 * xs)
y5 = y3 + (4 / (5 * np.pi)) * np.sin(5 * xs)
assert abs(y5[50] - 1.0) < 0.15

VO_DUR_PATH = os.environ.get("VO_DUR_JSON", "")
VO_TIMELINE_PATH = os.environ.get("VO_TIMELINE_JSON", "")


class FourierReel(Scene):
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

        # s1: Idea
        t0 = start_vo("s1")
        c = cap("Biến đổi & Chuỗi Fourier", size=36, color=GOLD)
        sub = para("Mọi tín hiệu tuần hoàn đều tách được\nthành tổng các sóng sin đơn giản", size=28, y=4.6, color=WHITE)
        ax = Axes(x_range=[0, 6.28, 1.57], y_range=[-1.6, 1.6, 0.8], x_length=7.4, y_length=4.2,
                  axis_config={"color": DIM}).move_to([0, 0.2, 0])
        g1 = ax.plot(lambda x: (4 / np.pi) * np.sin(x), color=BLUE)
        lbl1 = Text("N = 1 (cơ bản)", font=FONT, font_size=26, color=BLUE).move_to([0, -2.6, 0])
        self.play(FadeIn(c), FadeIn(sub), Create(ax), Create(g1), FadeIn(lbl1), run_time=1.3)
        end_vo("s1", t0, 4.0)

        # s2: Adding harmonics
        t0 = start_vo("s2")
        c = swap_cap(self, c, cap("Cộng thêm họa âm bậc lẻ", size=34, color=GREEN))
        g3 = ax.plot(lambda x: (4 / np.pi) * (np.sin(x) + np.sin(3 * x) / 3), color=GREEN)
        lbl3 = Text("N = 3: bắt đầu vuông hơn", font=FONT, font_size=26, color=GREEN).move_to([0, -2.6, 0])
        self.play(ReplacementTransform(g1, g3), ReplacementTransform(lbl1, lbl3), run_time=1.2)
        g7 = ax.plot(lambda x: (4 / np.pi) * sum(np.sin(k * x) / k for k in [1, 3, 5, 7]), color=GOLD)
        lbl7 = Text("N = 7: tiệm cận sóng vuông!", font=FONT, font_size=26, color=GOLD).move_to([0, -2.6, 0])
        self.play(ReplacementTransform(g3, g7), ReplacementTransform(lbl3, lbl7), run_time=1.2)
        end_vo("s2", t0, 5.0)

        # s3: Frequency Spectrum
        t0 = start_vo("s3")
        wipe(self, keep=[c])
        c = swap_cap(self, c, cap("Miền thời gian → Miền tần số", size=34, color=BLUE))
        bars = VGroup()
        heights = [3.6, 1.2, 0.72, 0.51]
        freqs = ["f1", "3f1", "5f1", "7f1"]
        for i, (h, fl) in enumerate(zip(heights, freqs)):
            x = -2.4 + i * 1.6
            r = Rectangle(width=0.7, height=h, color=GOLD, fill_color=GOLD, fill_opacity=0.8).move_to([x, -1.5 + h / 2, 0])
            t = Text(fl, font=FONT, font_size=24, color=WHITE).move_to([x, -2.1, 0])
            bars.add(VGroup(r, t))
        desc = para("Phổ tần số chỉ rõ biên độ của từng tần số\nthành phần — nền tảng của FFT & khử nhiễu", size=26, y=3.6, color=WHITE)
        self.play(FadeIn(desc), FadeIn(bars), run_time=1.3)
        end_vo("s3", t0, 5.0)

        # s4: Summary
        t0 = start_vo("s4")
        wipe(self, keep=[c])
        c = swap_cap(self, c, cap("Tóm tắt trực quan Fourier", size=34, color=GOLD))
        sum_txt = para(
            "• Chuỗi Fourier: phân tích tín hiệu tuần hoàn\n"
            "• Biến đổi Fourier: mở rộng cho tín hiệu bất kỳ\n"
            "• Ứng dụng: nén âm thanh, lọc nhiễu, xử lý ảnh",
            size=28, y=0.5, color=WHITE
        )
        self.play(FadeIn(sum_txt), run_time=1.0)
        end_vo("s4", t0, 4.0)

        if VO_TIMELINE_PATH:
            json.dump({"timeline": timeline, "total": float(self.time)}, open(VO_TIMELINE_PATH, "w"))
