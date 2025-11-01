import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap-trial/ScrollSmoother'
import SplitText from 'gsap-trial/SplitText'
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'
import MorphSVGPlugin from 'gsap-trial/MorphSVGPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, MorphSVGPlugin)

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, MorphSVGPlugin }
