import React, { useContext } from "react";
import { Button, Paper, Dialog, Slide, withStyles } from "@material-ui/core";
import {
  ImportContacts,
  Wifi,
  PersonAdd,
  FreeBreakfastTwoTone,
  ListTwoTone
} from "@material-ui/icons";
import treatmentIcon from "./img/menu-treatment.png";
import menuDrink from "./img/drink-img.jpg";
import menu from "./img/menu-img.jpg";
import menuTreatment from "./img/menu-treatment-img.jpg";
import googleQr from "./img/review_qr_google.png";
import facebookQr from "./img/review_qr_facebook.png";
import { ThemeContext, ArticleContext } from "./modules/Store";

const Transition = React.forwardRef(function Transition(props, ref) {
return <Slide direction="up" ref={ref} {...props} />;
});



const StyledDialog = withStyles({
    paper: {
    width: 500,
    height: 500,
    padding: 30
    }
})(Dialog);

const PModal = ({
    isOpen,
    setIsOpen,
    onClick,
    children,
    whichModal,
    setWhichModal,
    handleClickOpen,
    ...props
}) => {
    const theme = useContext(ThemeContext);
    const { params, tags, authors, dispatch } = React.useContext(
      ArticleContext
    );
    const dispatchAndClose = (type, value) => {
      dispatch({ type: type, payload: value });
      setIsOpen(false);
    };

    let modal
    switch (whichModal) {
      case "magazines":
        modal = (
          <Paper>
            Magzter
            <a href="fb179689808731959://" alt="">
              <ImportContacts style={theme.icon} />
            </a>
            楽天マガジン
            <a href="rmagazine://" alt="">
              <ImportContacts style={theme.icon} />
            </a>
          </Paper>
        );
        break;

      case "wifi":
        modal = <Paper>NAOKI Hair Dressing 02350235</Paper>;
        break;

      case "review":
        modal = (
          <Paper>
            レビューしてね。 google →<img src={googleQr} alt="" />
            facebook→
            <img src={facebookQr} alt="" />
          </Paper>
        );
        break;
      case "menus":
        modal = (
          <Paper>
            ドリンク、全体メニュー、トリートメント麺ニューを
            <FreeBreakfastTwoTone
              style={theme.icon}
              onClick={()=>setWhichModal(('menuDrink'))}
            />
            <ListTwoTone style={theme.icon} onClick={()=>setWhichModal(('menu'))}/>
            <img src={treatmentIcon} alt="" onClick={()=>setWhichModal(('menuTreatment'))}/>
          </Paper>
        );
        break;
    case "menuDrink":
        modal = <img src={menuDrink} alt="" />;
        break;
    case "menu":
        modal = <img src={menu} alt="" />;
        break;
    case "menuTreatment":
        modal = <img src={menuTreatment} alt="" />;
        break;
      case "tag":
        let tagsLang;
        if (params.isJa) {
          tagsLang = tags.tagsJa;
        } else {
          tagsLang = tags.tagsEn;
        }
        const tagsWrap = tagsLang.map((value, key) => (
          <Button key={key} onClick={() => dispatchAndClose("tag", value.id)}>
            {value.name}
          </Button>
        ));
        modal = <Paper>{tagsWrap}</Paper>;

        break;
      case "author":
        var auhtorsWrap = authors
          .filter(function(value) {
            if (value.name == "Naoki Hair Dressing") {
              return false; // skip
            }
            return true;
          })
          .map((value, key) => (
            <Button
              key={key}
              onClick={() => dispatchAndClose("author", value.id)}
            >
              {value.name}
            </Button>
          ));
        modal = <Paper>{auhtorsWrap}</Paper>;

        break;

      default:
        throw new Error();
    }

    return (
        <StyledDialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={onClick}
            {...props}
        >
            {modal} 
        </StyledDialog>
    );
};

export default PModal