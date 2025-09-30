'use client'

import React, {useEffect, useRef} from 'react'
import {Pagination, Scrollbar} from 'swiper'
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react'
import 'swiper/swiper.min.css'
import './pagination.css'

export function Carousel({children}: {children: React.ReactNode}) {
  const swiperRef = useRef(null as SwiperRef | null)

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(0)
  }, [children])

  return (
    <div className="relative">
      <div className="w-full">
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Scrollbar]}
          scrollbar={{draggable: true}}
          pagination={{clickable: true}}
          className="bg-gray-300"
        >
          {React.Children.map(children, (child, index) => {
            const key = `item-${index}`
            return (
              <SwiperSlide key={key} className="self-center">
                {child}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
