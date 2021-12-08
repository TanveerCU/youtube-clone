import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";
import { getVideosByCategory } from "../../redux/actions/videos.action";

function CategorySlider() {
  const { pathname } = useLocation();
  const [categoryBar, setCategoryBar] = useState(true);
  const category = [
    "All",
    "JavaScript",
    "Cricket",
    "Music",
    "Database",
    "Python",
    "Django",
    "Comedies",
    "Humans",
    "Kittens",
    "Sales",
    "Courses",
    "Mixes",
    "Cinema",
  ];
  const settings = {
    variableWidth: true,
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 10,
    swipeToSlide: true,
    slidesToScroll: 12,
    arrows: true,
    nextArrow: <KeyboardArrowRightOutlinedIcon />,
    prevArrow: <KeyboardArrowLeftOutlinedIcon />,
    className: "react__slick__slider__parent",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 290,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname === "/" || pathname === "/home") {
      setCategoryBar(true);
    } else {
      setCategoryBar(false);
    }
  }, [pathname]);

  return (
    <>
      {categoryBar ? (
        <div className=" ml-14 mt-  sm:ml-48 sm:mt-16 sm:pt-3 pt-5">
          <div className="w-10/12 sm:w-11/12 m-auto">
            <Slider {...settings}>
              {category.map((cat, i) => {
                return (
                  <div className=" flex  justify-center pl-1">
                    <Chip
                      key={i}
                      label={cat}
                      variant="outlined"
                      onClick={() => {
                        dispatch(getVideosByCategory(cat));
                      }}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CategorySlider;
