package com.projetoplaylist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoplaylist.entities.Music;
import com.projetoplaylist.entities.dto.musicdto.MusicPostDTO;
import com.projetoplaylist.repository.MusicRepository;
import com.projetoplaylist.service.exception.NotFoundException;

@Service
public class MusicService {
	
	@Autowired
	MusicRepository musicRepository;

	public MusicService() {
	}

	public MusicService(MusicRepository musicRepository) {
		this.musicRepository = musicRepository;
	}
	
	public Music fromMusic(MusicPostDTO musicPostDTO) {
		Music music = new Music();
		music.setName(musicPostDTO.getName());
		music.setArtist(musicPostDTO.getArtist());
		return music;
	}
	
	public Music findById(Long id) {
		return musicRepository.findById(id).orElseThrow(() -> new NotFoundException("Música não encontrada."));
	}
	
	public List<Music> findAll() {
		return musicRepository.findAll();
	}
	
	public List<Music> findByName(String name) {
	    return musicRepository.findByNameContainingIgnoreCase(name);
	}


	public void saveNewMusic(Music music) {
	    if (musicRepository.existsByNameIgnoreCase(music.getName())) {
	        throw new IllegalArgumentException("Já existe uma música com esse nome.");
	    }
	    musicRepository.save(music);
	}
	
	public Music updateMusic(Long id, MusicPostDTO dto) {
	    Music music = findById(id);

	    boolean isNameBlank = dto.getName() == null || dto.getName().isBlank();
	    boolean isArtistBlank = dto.getArtist() == null || dto.getArtist().isBlank();

	    if (!isNameBlank) {
	        if (!music.getName().equalsIgnoreCase(dto.getName()) &&
	            musicRepository.existsByNameIgnoreCase(dto.getName())) {
	            throw new IllegalArgumentException("Já existe uma música com esse nome.");
	        }
	        music.setName(dto.getName().trim());
	    }

	    if (!isArtistBlank) {
	        music.setArtist(dto.getArtist().trim());
	    }

	    return musicRepository.save(music);
	}


	
	public void deleteById(Long id) {
		Music music = musicRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("Música não encontrada."));
		musicRepository.delete(music);
	}

}
