import React from 'react'
import ReplayIcon from '@material-ui/icons/Replay'
import CloseIcon from '@material-ui/icons/Close'
import StarRateIcon from '@material-ui/icons/StarRate'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import IconButton from '@material-ui/core/IconButton'
import './Buttons.css'

export const Buttons = () => {
  return (
    <div className="rowButtons">
      {/* <IconButton className="buttons_repeat">
        <ReplayIcon fontSize="large" />
      </IconButton> */}
      <IconButton className="buttons_left">
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className="buttons_star">
        <StarRateIcon fontSize="large" />
      </IconButton>
      {/* <IconButton className="buttons_right">
        <FavoriteIcon fontSize="large" />
      </IconButton> */}
      {/* <IconButton className="buttons_lightning">
        <FlashOnIcon fontSize="large" />
      </IconButton> */}
    </div>
  )
}