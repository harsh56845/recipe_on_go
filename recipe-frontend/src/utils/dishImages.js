import moong_dal from "../assets/moong_dal.png";
import aloo_sandwich from "../assets/aloo_sandwich.png";
import chicken_biryani from "../assets/chicken_biryani.png";
import dal from "../assets/dal.png";
import dhokla from "../assets/dhokla.png";
import egg_curry from "../assets/egg_curry.png";
import egg_fried_rice from "../assets/egg_fried_rice.png";
import fried_rice from "../assets/fried_rice.png";
import handvo from "../assets/handvo.png";
import khichdi from "../assets/khichdi.png";
import korma from "../assets/korma.png";
import lauki_sabji from "../assets/lauki_sabji.png";
import maggi from "../assets/maggi.png";
import masoor_dal from "../assets/masoor_dal.png";
import mixed_vegetable from "../assets/mixed_vegetable.png";
import paneer_bhurji from "../assets/paneer_bhurji.png";
import paneer_butter_masala from "../assets/paneer_butter_masala.png";
import paneer_kadahi from "../assets/paneer_kadahi.png";
import paneer from "../assets/paneer.png";
import pav_bhaji from "../assets/pav_bhaji.png";
import pea_rice from "../assets/pea_rice.png";
import poha from "../assets/poha1.png";
import pulav from "../assets/pulav.png";
import shahi_paneer from "../assets/sahi_paneer.png";
import vada_pav from "../assets/vada_pav.png";
import veg_biryani from "../assets/veg_biryani.png";
import vegetable_fried_rice from "../assets/vegetable_fried_rice.png";
import vegetable_pulao from "../assets/vegetable_pulao.png";
import dal_chawal from "../assets/dal_chawal.png";
import dal_chhaunk from "../assets/dal_chhaunk.png";
import palak_paneer from "../assets/palak_paneer.png";
import chicken_curry from "../assets/chicken_curry.png";
import dal_tadka from "../assets/dal_tadka.png";
import paneer_tikka_masala from "../assets/paneer_tikka_masala.png";
import mutton_curry from "../assets/mutton_curry.png";
import mutton_biryani from "../assets/mutton_biryani.png";
import aloo_gobi from "../assets/aloo_gobi.png";
import aloo_matar from "../assets/aloo_matar.png";
import bhindi_masala from "../assets/bhindi_masala.png";
import aloo_palak from "../assets/aloo_palak.png";
import gobi_paratha from "../assets/gobi_paratha.png";
import baingan_bharta from "../assets/baingan_bharta.png";
import idli from "../assets/idli.png";
import matar_paneer from "../assets/matar_paneer.png";
import default_img from "../assets/default.png";

const dishImages = {
  "matar paneer": matar_paneer,
  "idli": idli,
  "baingan bharta": baingan_bharta,
  "gobi paratha": gobi_paratha,
  "aloo palak":aloo_palak,
  "bhindi masala": bhindi_masala,
  "aloo matar": aloo_matar,
  "aloo gobi": aloo_gobi,
  "mutton biryani": mutton_biryani,
  "mutton curry": mutton_curry,
  "paneer bhurji": paneer_bhurji,
  "palak paneer": palak_paneer,
  "chicken curry": chicken_curry,
  "dal tadka": dal_tadka,
  "fried rice": fried_rice,
  "pea rice": pea_rice,
  "dal chhaunk": dal_chhaunk,
  "dal chawal": dal_chawal,
  "vegetable pulao":vegetable_pulao,
  "vegetable fried rice": vegetable_fried_rice,
  "veg biryani": veg_biryani,
  "vada pav": vada_pav,
  "shahi paneer": shahi_paneer,
  "pav bhaji": pav_bhaji,
  "paneer kadahi": paneer_kadahi,
  "paneer butter masala": paneer_butter_masala,
  "mixed vegetable": mixed_vegetable,
  "masoor dal": masoor_dal,
  "lauki sabji": lauki_sabji,
  "egg fried rice": egg_fried_rice,
  "egg curry": egg_curry,
  "chicken biryani": chicken_biryani,
  "aloo sandwich": aloo_sandwich,
  "moong daal": moong_dal,
  "paneer tikka masala": paneer_tikka_masala,
  "poha":poha,
  "maggi": maggi,
  "pulav": pulav,
  "paneer": paneer,
  "korma": korma,
  "khichdi": khichdi,
  "handvo": handvo,
  "dhokla": dhokla,
  "dal": dal,
};

export default function getDishImage(dishName) {
  const formatted = dishName
    ?.toLowerCase()
    .replace(/_/g, " ")
    .trim();

  console.log("Formatted:", formatted);
  console.log("Image found:", dishImages[formatted]);

  return dishImages[formatted] || default_img;
}