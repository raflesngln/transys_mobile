import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, ColorValue, Animated, Easing } from 'react-native'

interface Props {
  color: ColorValue
  secondary: string
  durationMs?: number
}

const startRotationAnimation = (durationMs: number, rotationDegree: Animated.Value): void => {
  Animated.loop(Animated.timing(
    rotationDegree,
    {
      toValue: 360,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true
    }
  )).start()
}

function LoadingSpinner ({color,secondary,durationMs = 1000}: Props): JSX.Element {
  const rotationDegree = useRef(new Animated.Value(0)).current

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree)
  }, [durationMs, rotationDegree])

  return (
    <View style={styles.container} accessibilityRole='progressbar'>
      <View style={[styles.background, { borderColor: color }]} />
      <Animated.View
        style={[styles.progress, { 
            borderTopColor: color,
            borderLeftColor: secondary,
            borderRightColor: secondary,
            borderBottomColor: secondary,
        
        }, {
          transform: [{
            rotateZ: rotationDegree.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })
          }]
        }]}
      />
    </View>
  )
}

const height = 80

const styles = StyleSheet.create({
  container: {
    width: height,
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 10,
    opacity: 0.25
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 10,
    position: 'absolute'
  }
})

export default LoadingSpinner